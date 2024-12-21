import mitt from "mitt";
export const callStatusEmitter = mitt<{
  update: "inactive" | "active" | "calling" | "incoming" | "ended";
}>();
