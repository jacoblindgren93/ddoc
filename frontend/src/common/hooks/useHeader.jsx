import { useEffect, useState } from "react";
import Cookies from "universal-cookie";

export default function useHeader() {
    const cookie = new Cookies();
    const header = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookie.get("token")}`,
    };

    return { header };
}
