# AI integration foundation

AgroBioGuard currently uses `DemoImageAnalyzer`. It returns a clearly labelled mock result and makes no external request.

`ImageAnalyzer` is the shared provider contract: it accepts `ImageAnalysisInput` and returns an `AnalysisResult`. The central `image-analysis-service.ts` selects the active source. `demo`, `local`, and `cloud` are recognised sources; local and cloud currently use explicit unavailable placeholders and do not perform inference.

To add a real local model, replace the `local` placeholder with an `ImageAnalyzer` implementation. To add a cloud model, keep credentials on the server, create a server-side Next.js route or server action for the selected provider, and have the cloud analyzer call that secure boundary. Never place API keys in client components or `NEXT_PUBLIC_*` variables.

The safe placeholders in `.env.example` name the expected server-only configuration. Real AI is not active until a model/provider is deliberately implemented and the active source is changed from `demo`.
