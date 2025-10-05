import {
  type JobContext,
  type JobProcess,
  WorkerOptions,
  cli,
  defineAgent,
  metrics,
  voice,
} from '@livekit/agents';
import * as livekit from '@livekit/agents-plugin-livekit';
import * as silero from '@livekit/agents-plugin-silero';
import { BackgroundVoiceCancellation } from '@livekit/noise-cancellation-node';
import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';

dotenv.config({ path: '.env.local' });

class Assistant extends voice.Agent {
  constructor() {
    super({
      instructions: `You are a compassionate and supportive AI health assistant. Your purpose is to provide users with a safe, non-judgmental space to discuss their physical and mental health concerns. You have two primary roles:

1. As a Health Solutions Guide:
Your goal is to help users by exploring potential health solutions and wellness strategies based on the symptoms they describe. You can discuss lifestyle adjustments, general wellness tips, and explain what certain medical conditions typically involve.

Crucially, you must NEVER suggest specific medications. If a user asks for medicine suggestions, you must decline and explain that only a qualified doctor or pharmacist can provide that advice. Instead, you should always recommend they consult with a healthcare professional.

2. As a Therapy Support Assistant:
You are designed to act as an assistant for therapeutic support sessions. You can guide users through structured, evidence-based exercises for managing stress, anxiety, and depressive thoughts. This includes:

Leading guided breathing and mindfulness exercises.

Providing journaling prompts based on Cognitive Behavioral Therapy (CBT) principles.

Helping users reframe negative thoughts and identify patterns in their thinking.

Your Core Persona:
You will interact with the user through voice, so your responses must be clear, empathetic, and easy to understand. Maintain a calm, patient, and encouraging tone at all times. When a user expresses frustration, acknowledge their feelings and gently guide the conversation toward constructive support.

Mandatory Disclaimer:
At the beginning of the conversation and whenever appropriate, you must clarify that you are an AI and not a substitute for a real doctor or licensed therapist. Always recommend that the user consult a professional healthcare provider for a definitive diagnosis and treatment plan.`,

      // To add tools, specify `tools` in the constructor.
      // Here's an example that adds a simple weather tool.
      // You also have to add `import { llm } from '@livekit/agents' and `import { z } from 'zod'` to the top of this file
      // tools: {
      //   getWeather: llm.tool({
      //     description: `Use this tool to look up current weather information in the given location.
      //
      //     If the location is not supported by the weather service, the tool will indicate this. You must tell the user the location's weather is unavailable.`,
      //     parameters: z.object({
      //       location: z
      //         .string()
      //         .describe('The location to look up weather information for (e.g. city name)'),
      //     }),
      //     execute: async ({ location }) => {
      //       console.log(`Looking up weather for ${location}`);
      //
      //       return 'sunny with a temperature of 70 degrees.';
      //     },
      //   }),
      // },
    });
  }
}

export default defineAgent({
  prewarm: async (proc: JobProcess) => {
    proc.userData.vad = await silero.VAD.load();
  },
  entry: async (ctx: JobContext) => {
    // Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    const session = new voice.AgentSession({
      // Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
      // See all available models at https://docs.livekit.io/agents/models/stt/
      stt: 'assemblyai/universal-streaming:en',

      // A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
      // See all providers at https://docs.livekit.io/agents/models/llm/
      llm: 'openai/gpt-4.1-mini',

      // Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
      // See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
      tts: 'cartesia/sonic-2:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc',

      // VAD and turn detection are used to determine when the user is speaking and when the agent should respond
      // See more at https://docs.livekit.io/agents/build/turns
      turnDetection: new livekit.turnDetector.MultilingualModel(),
      vad: ctx.proc.userData.vad! as silero.VAD,
    });

    // To use a realtime model instead of a voice pipeline, use the following session setup instead.
    // (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    // 1. Install '@livekit/agents-plugin-openai'
    // 2. Set OPENAI_API_KEY in .env.local
    // 3. Add import `import * as openai from '@livekit/agents-plugin-openai'` to the top of this file
    // 4. Use the following session setup instead of the version above
    // const session = new voice.AgentSession({
    //   llm: new openai.realtime.RealtimeModel({ voice: 'marin' }),
    // });

    // Metrics collection, to measure pipeline performance
    // For more information, see https://docs.livekit.io/agents/build/metrics/
    const usageCollector = new metrics.UsageCollector();
    session.on(voice.AgentSessionEventTypes.MetricsCollected, (ev) => {
      metrics.logMetrics(ev.metrics);
      usageCollector.collect(ev.metrics);
    });

    const logUsage = async () => {
      const summary = usageCollector.getSummary();
      console.log(`Usage: ${JSON.stringify(summary)}`);
    };

    ctx.addShutdownCallback(logUsage);

    // Start the session, which initializes the voice pipeline and warms up the models
    await session.start({
      agent: new Assistant(),
      room: ctx.room,
      inputOptions: {
        // LiveKit Cloud enhanced noise cancellation
        // - If self-hosting, omit this parameter
        // - For telephony applications, use `BackgroundVoiceCancellationTelephony` for best results
        noiseCancellation: BackgroundVoiceCancellation(),
      },
    });

    // Join the room and connect to the user
    await ctx.connect();
  },
});

cli.runApp(new WorkerOptions({ agent: fileURLToPath(import.meta.url) }));
