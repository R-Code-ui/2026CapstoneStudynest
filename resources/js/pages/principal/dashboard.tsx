import { Head } from '@inertiajs/react';

export default function PrincipalDashboard() {
    return (
        <>
            <Head title="Principal Dashboard" />
            <div className="p-6">
                <h1 className="text-2xl font-bold">Principal Dashboard</h1>
                <p className="text-muted-foreground">Welcome, Principal.</p>
            </div>
        </>
    );
}
