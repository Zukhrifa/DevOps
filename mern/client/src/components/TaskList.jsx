import { useEffect, useState } from "react";

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function getTasks() {
      const response = await fetch(`https://your-vercel-domain.com/api/tasks`);
      const tasks = await response.json();
      setTasks(tasks);
    }
    getTasks();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Daftar Tugas EduCare</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task._id} className="border-b py-2">
            {task.title} - <span className="italic">{task.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}