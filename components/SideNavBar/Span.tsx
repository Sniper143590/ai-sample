const Span = ({ color, text, number }: { color: string; text: string; number: string }) => {
    return (
      <li className="w-full h-[48px]">
        <a className="h-full flex flex-row justify-between">
          <div className="flex flex-row gap-5 items-center justify-center">
            <div
                className={`w-[14px] h-[14px] rounded-[4px] ${color}`}
            />
            <p className="w-[154px]">{text}</p>
          </div>
          <div className="h-[24px] bg-[#232627] px-[8px] flex items-center justify-center text-[#6C7275] rounded-[8px]">
            <p>{number}</p>
          </div>
        </a>
      </li>
    );
  };
  
export default Span;