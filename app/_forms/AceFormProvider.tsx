"use client";
import { FormProvider, useForm } from "react-hook-form";
import { AceScaleScores, AceScaleScoresSchema } from "@/app/_forms/schemas/ace";
import { yupResolver } from "@hookform/resolvers/yup";
import { ReactNode } from "react";

interface AceFormProviderProps {
  children: ReactNode;
}

/**
 * FormProvider for our ACE-III score input form
 *
 * In order to preserve form state across the app, so scores
 * don't get reset when switching between pages/views,
 * we need to set up the form in the root layout
 * for the app, which requires a separate client component.
 *
 * We use react-hook-form's FormProvider to set up the form
 * context, and then useFormContext where we want to use
 * the form's values/methods
 */
export default function AceFormProvider({ children }: AceFormProviderProps) {
  const form = useForm<AceScaleScores>({
    mode: "all",
    defaultValues: AceScaleScoresSchema.getDefault(),
    resolver: yupResolver(AceScaleScoresSchema),
  });
  return <FormProvider {...form}>{children}</FormProvider>;
}
