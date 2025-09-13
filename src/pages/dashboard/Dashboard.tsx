/* eslint-disable @typescript-eslint/no-explicit-any */

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { symptomsSchema } from "@/schema";
import { useCreateSymptomsMutation } from "@/features/symptoms/symptomsApiSlice";
import type { SymptomAnalysis } from "@/types/symptoms";
import FeedbackForm from "@/components/FeedbackForm";

export default function Dashboard() {
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);
  const [analysisResponse, setAnalysisResponse] =
    useState<SymptomAnalysis | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [feedbackOpen, setFeedbackOpen] = useState(false);

  const [createSymptoms, { isLoading }] = useCreateSymptomsMutation();

  const form = useForm<z.infer<typeof symptomsSchema>>({
    resolver: zodResolver(symptomsSchema),
    defaultValues: {
      freeText: "",
      symptoms: [],
      context: "",
    },
  });

  function handleAddSymptom() {
    if (symptomInput.trim() !== "") {
      const updated = [...symptoms, symptomInput.trim()];
      setSymptoms(updated);
      setSymptomInput("");
      form.setValue("symptoms", updated);
    }
  }

  function handleRemoveSymptom(index: number) {
    const updated = symptoms.filter((_, i) => i !== index);
    setSymptoms(updated);
    form.setValue("symptoms", updated);
  }

  async function onSubmit(values: z.infer<typeof symptomsSchema>) {
    setErrorMessage(null);
    setAnalysisResponse(null);

    try {
      const res = await createSymptoms(values).unwrap();

      if (res?.data) {
        setAnalysisResponse(res.data); // ✅ fix here
      }

      form.reset();
      setSymptoms([]);
      setSymptomInput("");
    } catch (err: any) {
      console.log(err);
      const message =
        err?.data?.error ||
        err?.data?.message ||
        "Something went wrong. Please try again.";
      setErrorMessage(message);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-slate-50 to-slate-100 rounded-md">
      <h1 className="text-3xl font-semibold mb-8 text-center text-slate-800 tracking-tight">
        Tell us what’s going on
      </h1>

      <div className="w-full max-w-2xl bg-white shadow-md rounded-2xl p-6 space-y-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Free text */}
            <FormField
              control={form.control}
              name="freeText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    General Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="Describe in your own words how you’re feeling today..."
                      {...field}
                      className="w-full p-4 rounded-xl bg-slate-50 border text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Symptoms array */}
            <FormField
              control={form.control}
              name="symptoms"
              render={() => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Symptoms
                  </FormLabel>
                  <div className="flex gap-2">
                    <Input
                      disabled={isLoading}
                      placeholder="Type a symptom (e.g. headache) and press Add"
                      value={symptomInput}
                      onChange={(e) => setSymptomInput(e.target.value)}
                      className="flex-1 rounded-xl bg-slate-50 border text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
                    />
                    <Button
                      type="button"
                      onClick={handleAddSymptom}
                      className="px-4 bg-cyan-500 hover:bg-cyan-600 rounded-xl"
                    >
                      Add
                    </Button>
                  </div>

                  {symptoms.length > 0 && (
                    <ul className="flex flex-wrap gap-2 mt-3">
                      {symptoms.map((sym, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 px-3 py-1 bg-cyan-100 text-cyan-800 text-sm rounded-full"
                        >
                          {sym}
                          <button
                            type="button"
                            onClick={() => handleRemoveSymptom(idx)}
                            className="hover:text-red-600"
                          >
                            <X size={14} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Context */}
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-slate-700 font-medium">
                    Context
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      disabled={isLoading}
                      placeholder="When did it start? What makes it better or worse?"
                      {...field}
                      className="w-full p-4 rounded-xl bg-slate-50 border text-slate-800 placeholder:text-slate-400 focus:ring-2 focus:ring-cyan-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Submit */}
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-lg font-medium tracking-wide"
            >
              {isLoading ? "Analyzing..." : "Analyze My Symptoms"}
            </Button>
          </form>
        </Form>
      </div>

      {/* ChatGPT-style response display */}
      <div className="w-full max-w-2xl mt-8 space-y-4">
        {/* Error bubble */}
        {errorMessage && (
          <div className="bg-red-100 text-red-700 px-4 py-3 rounded-2xl shadow-sm">
            ❌ {errorMessage}
          </div>
        )}

        {/* Success bubble */}
        {analysisResponse && (
          <div className="space-y-4 ">
            <div className="flex justify-end">
              <div className="bg-cyan-500 text-white px-4 py-3 rounded-2xl max-w-[80%] shadow">
                {analysisResponse.freeText}
              </div>
            </div>

            <div className="flex justify-start">
              <div className="bg-white text-slate-800 px-4 py-3 rounded-2xl max-w-[80%] shadow space-y-3">
                <p>
                  <strong>Possible Conditions:</strong>{" "}
                  <ul className="list-disc pl-6 text-sm">
                    {analysisResponse?.differentials?.map((step, i) => (
                      <li key={i}>{step}</li>
                    ))}
                  </ul>
                </p>

                <p>
                  <strong>Triage:</strong> {analysisResponse.triage}
                </p>
                <p>
                  <strong>Red Flags:</strong>
                </p>
                <ul className="list-disc pl-6 text-sm">
                  {analysisResponse.redFlags.map((flag: string, i: number) => (
                    <li key={i}>{flag}</li>
                  ))}
                </ul>
                <p>
                  <strong>Next Steps:</strong>
                </p>
                <ul className="list-disc pl-6 text-sm">
                  {analysisResponse.nextSteps.map((step: string, i: number) => (
                    <li key={i}>{step}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setFeedbackOpen(true)}
        className="fixed bottom-6 right-6 flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-700 text-white font-medium rounded-full shadow-lg transition"
      >
        <MessageSquare size={18} />
        Feedback
      </button>

      {/* Feedback Modal */}
      <Dialog open={feedbackOpen} onOpenChange={setFeedbackOpen}>
        <DialogContent className="sm:max-w-md rounded-xl">
          <FeedbackForm onClose={() => setFeedbackOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
