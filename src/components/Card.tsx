export interface DetailEntry {
  title: string;
  meta: string;
  description: string;
}

interface CardProps {
  id: string;
  index: string;
  label: string;
  image: string;
  bgColor: string;
  darkText?: boolean;
  roundedSide?: "left" | "right";
  details: DetailEntry[];
  onCardClick: (cardId: string) => void;
  onClose: () => void;
}

export default function Card({
  id,
  index,
  label,
  image,
  bgColor,
  darkText,
  roundedSide,
  details,
  onCardClick,
  onClose,
}: CardProps) {
  const roundedClass =
    roundedSide === "left"
      ? "rounded-l-[20px]"
      : roundedSide === "right"
        ? "rounded-r-[20px]"
        : "";

  const detailBorderClass = darkText
    ? "border-black/15"
    : "border-white/15";

  return (
    <div
      className={`card relative flex-1 aspect-[400/521] [transform-style:preserve-3d] origin-top cursor-pointer ${roundedClass} max-[1000px]:w-full max-[1000px]:max-w-[400px] max-[1000px]:mx-auto max-[1000px]:!rounded-[20px]`}
      id={id}
      onClick={() => onCardClick(id)}
    >
      <div className="card-front absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden">
        <img className="w-full h-full object-cover" src={image} alt="" />
      </div>
      <div
        className={`card-back absolute w-full h-full [backface-visibility:hidden] rounded-[inherit] overflow-hidden flex justify-center items-center text-center [transform:rotateY(180deg)] p-8 ${darkText ? "text-[var(--bg)]" : ""}`}
        style={{ backgroundColor: `var(--${bgColor})` }}
      >
        <span className="absolute top-8 left-8 opacity-40">( {index} )</span>
        <div className="card-label">
          <p className="text-[1.8rem] font-medium leading-none">{label}</p>
        </div>
        <button
          className="close-btn absolute top-5 right-5 bg-transparent border-2 border-current text-inherit w-8 h-8 rounded-full text-sm cursor-pointer opacity-0 z-20 flex items-center justify-center hover:bg-white/15"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
        >
          ✕
        </button>
        <div className="card-detail absolute inset-0 pt-14 px-8 pb-8 opacity-0 pointer-events-none overflow-y-auto text-left flex flex-col gap-6">
          {details.map((entry, i) => (
            <div
              key={i}
              className={`detail-entry border-b ${detailBorderClass} pb-5 last:border-b-0`}
            >
              <h3 className="text-base font-semibold mb-1">{entry.title}</h3>
              <span className="text-[0.7rem] opacity-50 block mb-2 tracking-wide">
                {entry.meta}
              </span>
              <p className="text-[0.75rem] font-light leading-relaxed opacity-85">
                {entry.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
