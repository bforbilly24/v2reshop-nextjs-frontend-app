"use client";

import { redirect } from "next/navigation";

function DefaultPage({ params }: { params: { locale: string } }) {
  redirect(`/${params.locale}/seller/auth/login`);
}

export default DefaultPage;
