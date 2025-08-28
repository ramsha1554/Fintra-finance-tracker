import React from "react";

const SummaryCard = ({ icon: Icon, title, amount, bgColor, hoverColor, textColor }) => {
  return (
    <div
      className={`flex flex-col items-center p-4 rounded-xl shadow-md transition`}
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverColor)}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = bgColor)}
    >
      <Icon className="text-4xl mb-2" />
      <h3 className="font-semibold text-lg">{title}</h3>
      <p className="text-3xl font-bold mt-1">₹{amount}</p>
    </div>
  );
};

export default SummaryCard;
