import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

const Courses: React.FC = () => {
  return (
    <div className="p-6">
      <Link href="/teacher/create">
        <Button>New course</Button>
      </Link>
    </div>
  );
};

export default Courses;
