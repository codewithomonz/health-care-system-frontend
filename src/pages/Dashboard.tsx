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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
  freeText: z.string().min(12, {
    message: "Please provide a short description of how you feel.",
  }),
  symptoms: z
    .array(z.string().min(1, "Each symptom must not be empty"))
    .min(1, { message: "Please enter at least one symptom." }),
  context: z.string().min(10, {
    message: "Please provide some background (e.g. when it started).",
  }),
});

export default function Dashboard() {
  const [symptomInput, setSymptomInput] = useState("");
  const [symptoms, setSymptoms] = useState<string[]>([]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-10 bg-gradient-to-b from-slate-50 to-slate-100">
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
                      placeholder="Describe in your own words how you’re feeling today (e.g. tired, feverish, not sleeping well)..."
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

                  {/* Display added symptoms with remove option */}
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
                      placeholder="When did it start? What makes it better or worse? (e.g. started 3 days ago after travel)"
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
              className="w-full mt-6 px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-xl text-lg font-medium tracking-wide"
            >
              Analyze My Symptoms
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
