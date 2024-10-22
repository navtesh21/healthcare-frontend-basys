"use client";
import React from "react";
import { useForm, FieldError, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { createPriorRequest } from "@/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const statusOptions = ["approved", "pending", "denied"] as const;

// Zod schema
const schema = z.object({
  patientID: z.string().min(1, { message: "Patient ID is required" }),
  treatmentType: z.string().min(1, { message: "Treatment type is required" }),
  insurancePlan: z.string().optional(),
  diagnosisCode: z.string().optional(),
  treatmentDetails: z
    .string()
    .min(1, { message: "Treatment details are required" }),
  timestamp: z.string().optional(),
  status: z.enum(statusOptions).default("pending"),
});

export type FormData = z.infer<typeof schema>;

const TreatmentForm = ({ params }: { params: { id: string } }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  console.log(params.id);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    const res = await createPriorRequest(data);
    if (res) {
      toast("PriorAuthentication Created");
      router.replace("/dashboard");
    }
  };

  // Helper function to safely render error messages
  const renderErrorMessage = (error: FieldError | undefined) => {
    return error ? (
      <p className="mt-1 text-sm text-red-600">{error.message}</p>
    ) : null;
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Treatment Form</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="patientID"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Patient ID
          </label>
          <input
            id="patientID"
            type="text"
            readOnly
            defaultValue={params.id}
            {...register("patientID")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
          {renderErrorMessage(errors.patientID)}
        </div>

        <div>
          <label
            htmlFor="treatmentType"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Treatment Type
          </label>
          <input
            id="treatmentType"
            type="text"
            {...register("treatmentType")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
          {renderErrorMessage(errors.treatmentType)}
        </div>

        <div>
          <label
            htmlFor="insurancePlan"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Insurance Plan
          </label>
          <input
            id="insurancePlan"
            type="text"
            {...register("insurancePlan")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>

        <div>
          <label
            htmlFor="diagnosisCode"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Diagnosis Code
          </label>
          <input
            id="diagnosisCode"
            type="text"
            {...register("diagnosisCode")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>

        <div>
          <label
            htmlFor="treatmentDetails"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Treatment Details
          </label>
          <textarea
            id="treatmentDetails"
            {...register("treatmentDetails")}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 resize-none text-black"
          />
          {renderErrorMessage(errors.treatmentDetails)}
        </div>

        <div>
          <label
            htmlFor="timestamp"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Timestamp
          </label>
          <input
            id="timestamp"
            type="datetime-local"
            {...register("timestamp")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-black"
          />
        </div>

        <div>
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Status
          </label>
          <select
            id="status"
            {...register("status")}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 bg-white text-black"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default TreatmentForm;
