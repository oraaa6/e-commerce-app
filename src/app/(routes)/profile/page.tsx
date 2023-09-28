'use client'

import { PrivateRoute } from "@/components/private-route/private-route";

function Profile() {
    return <h1>PROFILE PAGE</h1>;
  }
  
  export default PrivateRoute(Profile)