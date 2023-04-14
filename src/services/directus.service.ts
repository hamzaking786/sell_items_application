import { Directus } from "@directus/sdk";

export const directus = new Directus("https://r4557okd.directus.app", {
  auth: {
    mode: "json",
  },
});

export const authService = {
  async login(email: string, password: string) {
    return await directus.auth.login({ email, password });
  },
  async register(firstName: string, email: string, password: string): Promise<boolean> {
    const createUserResult = await directus.users.createOne({
      first_name: firstName,
      email,
      password,
      role: "b4044cdc-c8e2-4839-a041-44665bd9c935"
    });

    return !!createUserResult?.email;
  },
  async logout() {
    return await directus.auth.logout();
  },
  async currentUser() {
    return await directus.users.me.read({
      fields: ["email", "first_name"],
    });
  },
};
