"use client";
import React from "react";
import { useForm, useFieldArray, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { createPatient } from "@/actions/auth";
import { ToastContainer, toast } from "react-toastify";
import { redirect, useRouter } from "next/navigation";

const schema = z.object({
  name: z.string(),
  age: z.number().int().positive("Age must be a positive integer"),
  treatmentPlan: z.string(),
  medicalHistory: z.array(
    z.object({
      condition: z.string(),
      date: z.string(),
      treatment: z.string(),
    })
  ),
  labDetails: z.array(
    z.object({
      url: z.string(),
      date: z.string(),
      testName: z.string(),
    })
  ),
});

export type patientSchema = z.infer<typeof schema>;

const PatientForm = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      age: 0,
      treatmentPlan: "",
      medicalHistory: [{ condition: "", date: "", treatment: "" }],
      labDetails: [{ url: "", date: "", testName: "" }],
    },
  });

  const router = useRouter()

  const {
    fields: medicalHistoryFields,
    append: appendMedicalHistory,
    remove: removeMedicalHistory,
  } = useFieldArray({
    control,
    name: "medicalHistory",
  });

  const {
    fields: labDetailsFields,
    append: appendLabDetails,
    remove: removeLabDetails,
  } = useFieldArray({
    control,
    name: "labDetails",
  });

  const onSubmit: SubmitHandler<patientSchema> = async (data) => {
    console.log(data);
    const res = await createPatient(data);
    if (res) {
      toast("Patient Created");
      router.replace("/dashboard");
    }
  };

  return (
    <div className="h-full w-full  bg-gray-100 ">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full   space-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          Patient Information Form
        </h2>

        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            {...register("name")}
            id="name"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="age"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Age
          </label>
          <input
            {...register("age", { valueAsNumber: true })}
            id="age"
            type="number"
            className="w-full px-3 py-2 border text-black border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="treatmentPlan"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Treatment Plan
          </label>
          <textarea
            {...register("treatmentPlan")}
            id="treatmentPlan"
            className="w-full text-black px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Medical History
          </label>
          {medicalHistoryFields.map((field, index) => (
            <div key={field.id} className="flex gap-3 mb-2 max-lg:flex-col ">
              <input
                {...register(`medicalHistory.${index}.condition`)}
                placeholder="Condition"
                className="flex-1 px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                {...register(`medicalHistory.${index}.date`)}
                type="date"
                className="flex-1 px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                {...register(`medicalHistory.${index}.treatment`)}
                placeholder="Treatment"
                className="flex-1 px-3 text-black py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeMedicalHistory(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendMedicalHistory({ condition: "", date: "", treatment: "" })
            }
            className="mt-2 px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Medical History
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Lab Details
          </label>
          {labDetailsFields.map((field, index) => (
            <div key={field.id} className="flex gap-3  max-lg:flex-col mb-2">
              <input
                {...register(`labDetails.${index}.url`)}
                placeholder="URL"
                className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                {...register(`labDetails.${index}.date`)}
                type="date"
                className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <input
                {...register(`labDetails.${index}.testName`)}
                placeholder="Test Name"
                className="flex-1 px-3 py-2 text-black border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={() => removeLabDetails(index)}
                className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                Remove
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              appendLabDetails({ url: "", date: "", testName: "" })
            }
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Add Lab Detail
          </button>
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 bg-green-500 text-black rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PatientForm;
