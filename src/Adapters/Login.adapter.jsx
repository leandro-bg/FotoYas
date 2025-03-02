import { RequestHttp } from "@HttpRequest";

export const AdapterLogin = async (creds) => {
  try {
    const resp = await RequestHttp(
      { email: creds.email, password: creds.password },
      { base: "auth", entry: "login", method: "POST" }
    );
    const user = resp.data;
    return {
      data: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        second_name: user.second_name,
        first_last_name: user.first_last_name,
        second_last_name: user.second_last_name,
        email: user.email,
        number_phone: user.number_phone,
        document: user.document,
        password_hash: user.password_hash,
        is_confirmed: user.is_confirmed,
        is_active: user.is_active,
        is_enable_temp_pass: user.is_enable_temp_pass,
        profile_id: user.profile_id,
        type_document_id: user.type_document_id,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: user.token,
        refresh_token: user.refresh_token,
        credits: user.credits,
      },
      msg: resp.msg,
      status: resp.status,
    };
  } catch (error) {
    throw error;
  }
};

export const AdapterGetSession = async () => {
  try {
    const resp = await RequestHttp(
      {},
      { base: "auth", entry: "getSession", method: "GET" }
    );
    const user = resp.data;
    return {
      data: {
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        second_name: user.second_name,
        first_last_name: user.first_last_name,
        second_last_name: user.second_last_name,
        email: user.email,
        number_phone: user.number_phone,
        document: user.document,
        password_hash: user.password_hash,
        is_confirmed: user.is_confirmed,
        is_active: user.is_active,
        is_enable_temp_pass: user.is_enable_temp_pass,
        profile_id: user.profile_id,
        type_document_id: user.type_document_id,
        created_at: user.created_at,
        updated_at: user.updated_at,
        token: user.token,
        refresh_token: user.refresh_token,
        credits: user.credits,
      },
      msg: resp.msg,
      status: resp.status,
    };
  } catch (error) {
    throw error;
  }
};
