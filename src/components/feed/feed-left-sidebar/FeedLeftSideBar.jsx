export default function FeedLeftSideBar({ activeTab, setActiveTab }) {
  const tabs = [
    {
      id: "feed",
      label: "Feed",
      icon: "fa-regular fa-newspaper",
    },
    {
      id: "community",
      label: "Community",
      icon: "fa-solid fa-users",
    },
  ];

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-neutral-200">
      <ul className="flex flex-col gap-2">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <li
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg font-semibold cursor-pointer transition-all duration-200
              
              ${
                isActive
                  ? "bg-blue-50 text-blue-600 border border-blue-200"
                  : "text-neutral-600 hover:bg-neutral-100"
              }
              
              `}
            >
              <i className={`${tab.icon} text-lg`}></i>

              <span className="text-sm">{tab.label}</span>

              {isActive && (
                <span className="ml-auto w-2 h-2 rounded-full bg-blue-500"></span>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
