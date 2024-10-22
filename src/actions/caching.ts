import { cache } from "react";
import { getRequests } from "./auth";

export  const getcacheRequests = cache(getRequests);
