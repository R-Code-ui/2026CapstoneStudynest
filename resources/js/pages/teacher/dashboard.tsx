import { Head } from '@inertiajs/react';

export default function TeacherDashboard() {
    return (
        <>
            <Head title="Teacher Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Teacher Dashboard</h1>
                <p className="text-muted-foreground">Welcome, Teacher.</p>
            </div>
        </>
    );
}
