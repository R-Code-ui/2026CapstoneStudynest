import { Head } from '@inertiajs/react';

export default function StudentDashboard() {
    return (
        <>
            <Head title="Student Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Student Dashboard</h1>
                <p className="text-muted-foreground">Welcome, Student.</p>
            </div>
        </>
    );
}
