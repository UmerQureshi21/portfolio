interface AboutProps {
  isDark: boolean;
}

export function About({ isDark }: AboutProps) {
  return (
    <div
      style={{
        backgroundColor: isDark ? "rgb(20,20,20)" : "rgb(240,240,240)",
      }}
      className="w-[95%] h-auto md:h-[200px] rounded-[20px] flex flex-col items-center justify-center p-6 md:p-0"
    >
      <h1 className="w-[90%] text-left text-[24px] md:text-[30px] text-[rgb(231,74,74)] font-bold">
        About
      </h1>
      <h1
        style={{
          color: isDark ? "white" : "black",
        }}
        className="text-[16px] md:text-[20px] w-[90%] mt-[20px] font-light"
      >
        I'm into building backend systems and solving problems with innovative
        solutions! In my free time, you can catch me at the gym or playing
        different card games!
      </h1>
    </div>
  );
}
