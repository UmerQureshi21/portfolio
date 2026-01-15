interface props {
  isDark: boolean;
}

export function Education({ isDark }: props) {
  return (
    <div
      style={{
        backgroundColor: isDark ? "rgb(20,20,20)" : "rgb(240,240,240)",
      }}
      className="w-[95%] h-auto md:h-[200px] pt-[20px] bg-[rgb(20,20,20)] rounded-[20px] flex flex-col items-center justify-center p-6 md:p-0"
    >
      <h1 className="w-[90%] text-left text-[24px] md:text-[30px] text-[rgb(231,74,74)] font-bold">
        Education
      </h1>
      <div className="flex items-center gap-[10px] md:gap-[5px] w-[90%] py-[15px]">
        <img
          src="/maclogo.png"
          alt=""
          className="w-[40px] md:w-[3%] min-w-[40px]"
        />
        <h1
          style={{
            color: isDark ? "white" : "black",
          }}
          className=" text-[16px] md:text-[20px]"
        >
          McMaster University, BSc. Computer Science 2024 - 2028 (3.7 GPA)
        </h1>
      </div>
    </div>
  );
}
