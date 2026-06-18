import { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export interface Auth {
    user: User;
}

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

export interface User {
    id: number;
    name: string;
    first_name: string;
    last_name: string;
    email: string;
    lrn?: string | null;
    teacher_id?: string | null;
    principal_id?: string | null;
    grade_level?: string | null;
    is_archived: boolean;
    last_activity_at?: string | null;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    [key: string]: unknown;
}

// ============================================================
// Principal Dashboard Types
// ============================================================

export interface DashboardStats {
    totalTeachers: number;
    totalStudents: number;
    totalLessons: number;
    totalAssignments: number;
    totalQuizzes: number;
    totalAnnouncements: number;
}

export interface TeacherActivity {
    name: string;
    teacher_id: string;
    lessons: number;
    assignments: number;
    quizzes: number;
    last_activity: string;
}

export interface StudentParticipation {
    grade_level: string;
    students: number;
    active_students: number;
    participation_rate: number;
}

export interface RecentActivity {
    teacher_name: string;
    activity_type: string;
    description: string;
    created_at: string;
}

export interface RecentAnnouncement {
    title: string;
    author_name: string;
    author_role: string;
    created_at: string;
}

export interface AcademicSummary {
    avg_quiz_score: number;
    assignment_completion_rate: number;
    lesson_completion_rate: number;
}

export interface QuickStats {
    most_active_teacher: string | null;
    least_active_teacher: string | null;
    teachers_with_no_activity: number;
}
