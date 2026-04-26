import { useEffect, useState } from "react";
import API from "../services/api";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");

        const res = await API.get("/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(res.data.user);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const weeklyData = [
    { day: "Mon", tasks: 3 },
    { day: "Tue", tasks: 6 },
    { day: "Wed", tasks: 4 },
    { day: "Thu", tasks: 8 },
    { day: "Fri", tasks: 5 },
    { day: "Sat", tasks: 7 },
    { day: "Sun", tasks: 9 },
  ];

  const projectData = [
    { name: "UI", value: 4 },
    { name: "Backend", value: 6 },
    { name: "API", value: 3 },
    { name: "Testing", value: 2 },
  ];

  const progressData = [
  { name: "Completed", value: 40 },
  { name: "In Progress", value: 35 },
  { name: "Pending", value: 25 },
];

const COLORS = ["#22c55e", "#4f46e5", "#a78bfa"];

  return (
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-500">
            Welcome back,{" "}
            <span className="text-indigo-600 font-semibold">
              {user?.name || "User"} 👋
            </span>
          </p>
        </div>

        <div className="bg-white px-4 py-2 rounded-lg shadow text-sm">
          {new Date().toLocaleDateString()}
        </div>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

  {/* Projects */}
  <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition">
    <div>
      <p className="text-gray-500 flex items-center gap-2">
        <i className="ri-folder-line text-indigo-600"></i>
        Total Projects
      </p>
      <h2 className="text-2xl font-bold mt-1">24</h2>
      <p className="text-green-500 text-sm mt-1">+12% from last month</p>
    </div>
  </div>

  {/* Tasks */}
  <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition">
    <div>
      <p className="text-gray-500 flex items-center gap-2">
        <i className="ri-list-check text-blue-600"></i>
        Total Tasks
      </p>
      <h2 className="text-2xl font-bold mt-1">152</h2>
      <p className="text-green-500 text-sm mt-1">+8% from last month</p>
    </div>
  </div>

  {/* Completed */}
  <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition">
    <div>
      <p className="text-gray-500 flex items-center gap-2">
        <i className="ri-checkbox-circle-line text-green-600"></i>
        Completed
      </p>
      <h2 className="text-2xl font-bold mt-1 text-green-600">98</h2>
      <p className="text-green-500 text-sm mt-1">+18% from last month</p>
    </div>
  </div>

  {/* Progress */}
  <div className="bg-white p-5 rounded-xl shadow flex items-center justify-between hover:shadow-lg transition">
    <div>
      <p className="text-gray-500 flex items-center gap-2">
        <i className="ri-bar-chart-line text-purple-600"></i>
        Progress
      </p>
      <h2 className="text-2xl font-bold mt-1 text-purple-600">68%</h2>
      <p className="text-green-500 text-sm mt-1">+5% from last month</p>
    </div>
  </div>

</div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Weekly Activity</h2>

          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={weeklyData}>
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="tasks" stroke="#4f46e5" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>


        

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Projects Status</h2>

          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="relative w-[200px] h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={progressData}
                    dataKey="value"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={3}
                  >
                    {progressData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>

              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <p className="text-2xl font-bold">24</p>
                <p className="text-gray-500 text-sm">Projects</p>
              </div>
            </div>

            <div className="w-full max-w-[220px] space-y-3 text-sm">
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                  Completed
                </span>
                <span>40%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-indigo-600 rounded-full"></span>
                  In Progress
                </span>
                <span>35%</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <span className="w-3 h-3 bg-purple-400 rounded-full"></span>
                  Pending
                </span>
                <span>25%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
