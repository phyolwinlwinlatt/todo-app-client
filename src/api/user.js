import service from "./service";

export const signIn = (body) =>
  service({
    method: "POST",
    url: "users/sign-in",
    data: JSON.stringify(body),
  });

export const signUp = (body) =>
  service({
    method: "POST",
    url: "users/sign-up",
    data: JSON.stringify(body),
  });
