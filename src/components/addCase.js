import {
  doc,
  setDoc,
  collection,
  getFirestore,
  serverTimestamp,
  arrayUnion,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
// FMR -> File Missing Report
// MR -> Medical Report
// NPR -> News Paper Report
// SIR -> Social Investigation Report
// TVR -> TV Report
// FPR -> Final Police Report
// PDC -> Parent's Death Certificate
// OC -> Orphan Certificate
// GTR -> Guardian Trace Report
// Abandoned Child -> NPR, TVR, FMR, FPR, MR(if needed), SIR(if needed)
// Orphaned Child -> NPR, TVR, FPR, PDC(if available), OC(if available), MR(if needed), SIR(if needed)
// Surrendered Child -> Surrender Deed, 
// Child admitted by guardians -> SIR, NPR, TVR, GTR, FPR, MR

export const addProcessSurrendered = async (caseNumber) => {
  await setDoc(doc(db, "caseProcesses", caseNumber), {
    SurrenderDeed: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    LFA: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    Carings: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    isComplete: 0,
  });
  console.log("Added Process");
};

export const addProcessAdmittedByGuardians = async (caseNumber) => {
  await setDoc(doc(db, "caseProcesses", caseNumber), {
    SIR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    NPR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    TVR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    GTR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    FPR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    MR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    NOC: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    LFA: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    Carings: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    isComplete: 0,
  });
  console.log("Added Process");
};

export const addProcessOrphaned = async (caseNumber) => {
  await setDoc(doc(db, "caseProcesses", caseNumber), {
    NPR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    TVR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    FPR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    PDC: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    OC: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    MR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    SIR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    NOC: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    LFA: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    Carings: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    isComplete: 0,
  });
  console.log("Added Process");
};

export const addProcessAbandoned = async (caseNumber) => {
  await setDoc(doc(db, "caseProcesses", caseNumber), {
    FMR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    MR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    NPR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    SIR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    TVR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    FPR: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    NOC: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    LFA: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    Carings: {
      Docs: "",
      Status: "In Progress",
      Text: "",
      isComplete: false,
    },
    isComplete: 0,
  });
  console.log("Added Process");
};

export const addDeadline = async (caseNumber, date) => {
  await setDoc(doc(db, "caseDeadlines", caseNumber), {
    Deadline: date,
  });
  console.log("Added Deadline");
};

export const intializeCaseComment = async (caseNumber) => {
  await setDoc(doc(db, "caseComments", caseNumber), {
    ManagerComment: [],
    ManagerTime: [],
    WorkerComment: [],
    WorkerTime: [],
  });
};

export const addManagerComment = async (caseNumber, comment) => {
  let dt = new Date();
  console.log(dt.toDateString());

  await updateDoc(doc(db, "caseComments", caseNumber), {
    ManagerComment: arrayUnion(comment),
    ManagerTime: arrayUnion(dt.toDateString()),
  });
};

export const addWorkerComment = async (caseNumber, comment) => {
  let dt = new Date();
  console.log(dt.toDateString());
  await updateDoc(doc(db, "caseComments", caseNumber), {
    WorkerComment: arrayUnion(comment),
    WorkerTime: arrayUnion(dt.toDateString()),
  });
};
