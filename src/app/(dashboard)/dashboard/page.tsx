"use client";

import { getPatients } from "@/actions/auth";
import { getcacheRequests } from "@/actions/caching";
import AuthRequests from "@/components/AuthRequests";
import Modal from "@/components/Modal";
import { FileText, Plus, Users } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

function page() {
  const [patients, setPatients] = useState([]);
  const [modal, showModal] = useState(false);
  const [authRequests, setAuthRequests] = useState([]);

  useEffect(() => {
    const data = async () => {
      const res = await getPatients();
      const requests = await getcacheRequests();
      setPatients(res.data);
      setAuthRequests(requests);
    };

    data();
  }, []);
  console.log(modal);

  return (
    <div onClick={() => showModal(false)}>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>

          <div className="mt-6">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Users className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Total Patients
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {patients.length > 0 ? patients.length : 0}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <FileText className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Authorizations
                        </dt>
                        <dd className="text-3xl font-semibold text-gray-900">
                          {authRequests && authRequests.length > 0 ? authRequests.length : 0}
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-5 py-3">
                  <div className="text-sm">
                    <a
                      href="#"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      View all
                    </a>
                  </div>
                </div>
              </div>

              <div className="bg-white overflow-hidden shadow rounded-lg">
                <div className="p-5">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <Plus className="h-6 w-6 text-gray-400" />
                    </div>
                    <div className="ml-5 w-0 flex-1">
                      <dl>
                        <dt className="text-sm font-medium text-gray-500 truncate">
                          Quick Actions
                        </dt>
                        <dd className="mt-1">
                          <Link
                            href="patientCreate"
                            className="text-sm text-indigo-600 hover:text-indigo-500"
                          >
                            New Patient
                          </Link>
                        </dd>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
                            TreatmentPlan
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Age
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          ></th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {patients && patients.length > 0 ? (
                          patients.map((request) => (
                            <>
                              <tr
                                key={request.id}
                                className="hover:bg-gray-100"
                                onClick={() => showModal(true)}
                              >
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm font-medium text-gray-900">
                                    {request.name}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <div className="text-sm text-gray-500">
                                    {request.treatmentPlan}
                                  </div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                                  {request.age}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                  <Link
                                    href={`priorAuth/${request._id}`}
                                    className="p-2 bg-blue-700 rounded-xl"
                                  >
                                    Create Request
                                  </Link>
                                </td>
                                {modal && <Modal show={modal} />}
                              </tr>
                            </>
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
        </div>
        <h1 className="text-xl font-semibold text-gray-900">Auth Requests</h1>
        <AuthRequests />
      </div>
    </div>
  );
}

export default page;
