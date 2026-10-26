import { useMutation } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export type RequestInput = {
  kind: "contact" | "devis";
  name: string;
  email: string;
  phone?: string;
  circuitSlug?: string;
  travelers?: number;
  period?: string;
  message?: string;
};

export function useCreateRequest() {
  return useMutation(orpc.requests.create.mutationOptions());
}
