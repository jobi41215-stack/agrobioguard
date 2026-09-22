"use client";

import { ChangeEvent, useEffect, useRef, useState } from "react";
import { analyzeImage as analyzeSelectedImage } from "@/lib/analysis/image-analysis-service";
import { getSafeAnalysisErrorMessage } from "@/lib/analysis/analysis-provider-error";
import type { AnalysisResult } from "@/lib/analysis/types";

type AnalysisState = "empty" | "ready" | "loading" | "success" | "error";

export function IdentificationWorkspace() {
  const [preview, setPreview] = useState<string>();
  const [fileName, setFileName] = useState("");
  const [image, setImage] = useState<File>();
  const [result, setResult] = useState<AnalysisResult>();
  const [state, setState] = useState<AnalysisState>("empty");
  const [error, setError] = useState("");
  const uploadInput = useRef<HTMLInputElement>(null);
  const cameraInput = useRef<HTMLInputElement>(null);

  useEffect(() => () => {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
  }, [preview]);

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Choose an image file in JPG, PNG, WebP, or another supported image format.");
      setState("error");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError("This image is larger than 10 MB. Choose a smaller image and try again.");
      setState("error");
      return;
    }
    setError("");
    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    setImage(file);
    setResult(undefined);
    setState("ready");
  }

  function clearImage() {
    if (preview?.startsWith("blob:")) URL.revokeObjectURL(preview);
    setPreview(undefined);
    setFileName("");
    setImage(undefined);
    setResult(undefined);
    setError("");
    setState("empty");
    if (uploadInput.current) uploadInput.current.value = "";
    if (cameraInput.current) cameraInput.current.value = "";
  }

  async function analyzeImage() {
    if (!image) {
      setError("Add an image before starting an analysis.");
      setState("error");
      return;
    }
    setError("");
    setState("loading");

    try {
      const analysis = await analyzeSelectedImage({ image });
      setResult(analysis);
      setState("success");
    } catch (analysisError) {
      setError(getSafeAnalysisErrorMessage(analysisError));
      setState("error");
    }
  }

  return (
    <section className="identification-section" id="identify" aria-labelledby="identify-title">
      <div className="wrap">
        <div className="section-heading identification-heading">
          <div><p className="eyebrow"><i /> AI IDENTIFICATION</p><h2 id="identify-title">Turn a field image into a clearer next step.</h2></div>
          <p>Upload a close, well-lit image or use your device camera. This Phase 2 experience uses a clearly marked demo result while the real vision service is prepared separately.</p>
        </div>

        <div className="identification-grid">
          <div className="upload-panel">
            <div className="panel-label"><span>IMAGE INPUT</span><b>Demo workflow</b></div>
            {!preview ? <div className="dropzone">
              <span className="upload-symbol" aria-hidden="true">⌁</span>
              <h3>Add an observation image</h3>
              <p>Use a focused image of one plant, animal, insect, or weed for the best future model result.</p>
              <div className="upload-actions">
                <label className="button primary upload-trigger">Upload image<input ref={uploadInput} type="file" accept="image/*" onChange={selectFile} /></label>
                <label className="button outline upload-trigger">Use camera<input ref={cameraInput} type="file" accept="image/*" capture="environment" onChange={selectFile} /></label>
              </div>
              <small>JPG, PNG, WebP · maximum 10 MB · no upload occurs in demo mode</small>
            </div> : <div className="image-preview-wrap">
              <img className="image-preview" src={preview} alt={`Selected image: ${fileName}`} />
              <div className="preview-details"><span><b>READY FOR REVIEW</b><small>{fileName}</small></span><button className="remove-image" onClick={clearImage}>Remove image</button></div>
              <div className="upload-actions compact"><label className="button outline upload-trigger">Change image<input ref={uploadInput} type="file" accept="image/*" onChange={selectFile} /></label><label className="button outline upload-trigger">Use camera<input ref={cameraInput} type="file" accept="image/*" capture="environment" onChange={selectFile} /></label></div>
            </div>}
            {state === "error" && <p className="analysis-error" role="alert">{error}</p>}
            <button className="button analyze-button" onClick={analyzeImage} disabled={state === "loading"}>{state === "loading" ? "Preparing demo analysis…" : "Analyze image"}<span>→</span></button>
          </div>

          <div className="result-panel" aria-live="polite">
            <div className="panel-label"><span>ANALYSIS RESULT</span><b className="demo-label">DEMO / MOCK</b></div>
            {state === "empty" || state === "error" ? <div className="result-empty"><span aria-hidden="true">◌</span><h3>Your identification will appear here.</h3><p>Results will include the category, safety or risk context, and a practical recommendation.</p></div> : null}
            {state === "ready" ? <div className="result-empty"><span aria-hidden="true">◎</span><h3>Image ready for analysis.</h3><p>Select <b>Analyze image</b> to preview the future computer-vision result workflow.</p></div> : null}
            {state === "loading" ? <div className="result-loading"><span className="loader" /><h3>Preparing a demo result</h3><p>No AI model or external service is being called.</p></div> : null}
            {state === "success" ? <div className="result-content">
              <div className="result-title"><span className="category-pill">{result?.category}</span>{result?.confidence !== undefined ? <span className="confidence">Demo confidence <b>{result.confidence}%</b></span> : null}</div>
              <h3>{result?.identifiedName}{result?.scientificName ? ` (${result.scientificName})` : ""}</h3><p className="result-description">{result?.description}</p>
              <dl className="result-details"><div><dt>Potential risk · {result?.riskLevel}</dt><dd>{result?.riskDescription}</dd></div><div><dt>Recommended action</dt><dd>{result?.recommendation}</dd></div><div><dt>Location &amp; context</dt><dd>{result?.locationContext ?? "Not available."}</dd></div></dl>
              <div className="analysis-note"><span>ⓘ</span><p><b>Demo analysis only.</b> This is a representative interface result, not an identification by a live AI model.</p></div>
            </div> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
