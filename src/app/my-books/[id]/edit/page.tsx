import { Suspense } from "react";
import EditBookForm from "./EditBookForm";

export default function EditBookPage() {
    return (
        <Suspense fallback={
            <div className="text-center py-20">
                Loading book...
            </div>
        }>
            <EditBookForm />
        </Suspense>
    );
}