"use client";
import { getRequests } from "@/actions/auth";
import { getcacheRequests } from "@/actions/caching";
import React, { useEffect, useState } from "react";

function AuthRequests() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await getcacheRequests();
      setPatients(res);
    };

    data();
  }, []);

  console.log(patients);

  return (
    <div className="mt-8">
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Patient
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      insurancePlan
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      diagnosis Code
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {patients && patients.length > 0 ? (
                    patients.map((request) => (
                      <tr key={request._id} className="hover:bg-gray-100">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {request.patientID.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {request.insurancePlan}
                          </div>
                        </td>
                        <td
                          className="px-6 py-4 whitespace-nowrap
                        "
                        >
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              request.status === "Pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : request.status === "Approved"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {request.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {request.diagnosisCode}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <p className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      No Patients
                    </p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthRequests;
