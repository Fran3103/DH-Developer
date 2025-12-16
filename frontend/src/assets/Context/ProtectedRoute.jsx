// import { useContext } from "react";
// import UserContext from "./UseContext";
// import { Navigate } from "react-router-dom";

// export default function ProtectedRoute( children ) {
//   const { user, loading } = useContext(UserContext);
//   if (loading) return <div>Loading...</div>;
//     if (!user) return <Navigate to="/login" replace />;
//     return children;
// }