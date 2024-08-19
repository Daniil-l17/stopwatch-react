import { useEffect, useRef, useState } from 'react';

function App() {
  const [timer, setTimer] = useState({ sec: 0, min: 0 });
  const [isPlay, setIsPlay] = useState(false);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    if (isPlay) {
      ref.current = setInterval(() => {
        setTimer(prev => {
          if (prev.sec === 60) {
            return { ...prev, min: prev.min + 1, sec: 0 };
          } else if (prev.min === 60) {
            clearInterval(ref.current!);
            return { sec: 0, min: 0 };
          }
          return { ...prev, sec: prev.sec + 1 };
        });
      }, 1000);
    }
    return () => {
      clearInterval(ref.current!);
    };
  }, [isPlay]);

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className=" border-[1px] mx-4 border-[#e3e3e316] p-4 flex-col items-center bg-[#60606050] flex justify-center rounded-2xl w-full max-w-[800px] h-[450px]">
        <div className="flex mx-4 justify-center w-[250px] h-[250px] rounded-[50%] border-[4px] border-[#ca9759] items-center gap-8">
          <h2 className="font-semibold text-4xl">
            {timer.sec > 9 ? timer.sec : `0${timer.sec}`}:
            {timer.min > 9 ? timer.min : `0${timer.min}`}
          </h2>
        </div>
        <div className=" mt-10 flex gap-10">
          <button
            onClick={() => setIsPlay(prev => !prev)}
            className=" border-[1px] tex-lg font-semibold border-[#e3e3e33a] hover:scale-110 transition-all duration-300 bg-[#5f86fbef] rounded-xl px-10 py-2">
            {isPlay ? 'stop' : 'play'}
          </button>
          <button
            onClick={() => {
              setIsPlay(false);
              setTimer({ sec: 0, min: 0 });
            }}
            className="border-[1px] tex-lg font-semibold border-[#e3e3e33a] hover:scale-110 transition-all duration-300 bg-[#be554fef] rounded-xl px-10 py-2">
            reset
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
