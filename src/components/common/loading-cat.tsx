export default function LoadingCat() {
    return (
        <div className='relative pointer-events-none z-50'>
            <div
                className='animate-rotate -translate-x-30 h-[240px] w-[240px] overflow-visible fixed top-32'
                style={{ transformStyle: 'preserve-3d' }}>
                <div
                    className="h-[160px] w-[200px] absolute bg-slate-800 
                  after:content-[''] after:absolute after:block after:z-[99] after:h-0 after:w-0 after:top-[-40px] after:left-0 
                  after:border-solid after:border-transparent after:border-b-slate-bg-slate-800 after:border-[20px] after:border-l-0
                  before:content-[''] before:absolute before:block before:z-[99] before:h-0 before:w-0 before:top-[-40px] before:right-0 
                  before:border-solid before:border-transparent before:border-b-slate-bg-slate-800 before:border-[20px] before:border-r-0"
                    style={{ transform: 'translate3d(0, 0, 100px)' }}>
                    <div className='eye eye--left h-[40px] w-[40px] bg-white absolute top-[60px] left-[20px] rounded-full'></div>
                    <div className='eye eye--right h-[40px] w-[40px] bg-white absolute top-[60px] right-[20px] rounded-full'></div>
                    <div className='nose relative h-0 w-0 top-[80px] ml-[50%] left-[-10px] border-transparent border-t-white border-solid border-[10px]'></div>
                </div>

                <div
                    className="h-[160px] w-[200px] absolute bg-slate-800
                  after:content-[''] after:absolute after:block after:z-[99] after:h-0 after:w-0 after:top-[160px] after:left-0 
                  after:border-solid after:border-transparent after:border-t-slate-bg-slate-800 after:border-[20px] after:border-l-0
                  before:content-[''] before:absolute before:block before:z-[99] before:h-0 before:w-0 before:top-[160px] before:right-0 
                  before:border-solid before:border-transparent before:border-t-slate-bg-slate-800 before:border-[20px] before:border-r-0"
                    style={{ transform: 'rotateX(180deg) translateZ(100px)' }}>
                    <div className='eye eye--left h-[20px] w-[40px] bg-white absolute bottom-[60px] left-[20px] rounded-tl-[20px] rounded-tr-[20px]'></div>
                    <div className='eye eye--right h-[20px] w-[40px] bg-white absolute bottom-[60px] right-[20px] rounded-tl-[20px] rounded-tr-[20px]'></div>
                    <div className='nose relative h-0 w-0 top-[60px] ml-[50%] left-[-10px] border-transparent border-b-white border-solid border-[10px]'></div>
                </div>

                <div
                    className="h-[160px] w-[200px] absolute bg-slate-900
                  after:content-[''] after:absolute after:block after:z-[99] after:h-0 after:w-0 after:top-[-40px] after:left-0 
                  after:border-solid after:border-transparent after:border-b-slate-950 after:border-[20px] after:border-l-0
                  before:content-[''] before:absolute before:block before:z-[99] before:h-0 before:w-0 before:top-[-40px] before:right-0 
                  before:border-solid before:border-transparent before:border-b-slate-950 before:border-[20px] before:border-r-0"
                    style={{ transform: 'rotateY(-90deg) translateZ(100px)' }}>
                    <div className='eye eye--left h-[20px] w-[40px] bg-white absolute top-[60px] left-[20px] rounded-tl-[20px] rounded-tr-[20px]'></div>
                    <div className='eye eye--right h-[20px] w-[40px] bg-white absolute top-[60px] right-[20px] rounded-tl-[20px] rounded-tr-[20px]'></div>
                    <div className='nose relative h-0 w-0 top-[80px] ml-[50%] left-[-10px] border-transparent border-t-white border-solid border-[10px]'></div>
                </div>

                <div
                    className="h-[160px] w-[200px] absolute bg-slate-900
                  after:content-[''] after:absolute after:block after:z-[99] after:h-0 after:w-0 after:top-[-40px] after:left-0 
                  after:border-solid after:border-transparent after:border-b-slate-950 after:border-[20px] after:border-l-0
                  before:content-[''] before:absolute before:block before:z-[99] before:h-0 before:w-0 before:top-[-40px] before:right-0 
                  before:border-solid before:border-transparent before:border-b-slate-950 before:border-[20px] before:border-r-0"
                    style={{ transform: 'rotateY(90deg) translateZ(100px)' }}>
                    <div className='eye eye--left h-[40px] w-[40px] bg-transparent border-[4px] border-solid border-white border-r-transparent border-b-transparent absolute top-[60px] left-[20px] rounded-full rotate-45'></div>
                    <div className='eye eye--right h-[40px] w-[40px] bg-transparent border-[4px] border-solid border-white border-r-transparent border-b-transparent absolute top-[60px] right-[20px] rounded-full rotate-45'></div>
                    <div className='nose relative h-0 w-0 top-[80px] ml-[50%] left-[-10px] border-transparent border-t-white border-solid border-[10px]'></div>
                </div>

                <div className='h-[200px] w-[200px] absolute bg-slate-900' style={{ transform: 'rotateX(90deg) translateZ(100px)' }}></div>
                <div className='h-[200px] w-[200px] absolute bg-slate-900' style={{ transform: 'rotateX(-90deg) translateZ(60px)' }}></div>
            </div>
            <p className='text-slate-600 text-center text-2xl font-black italic fixed top-80 left-1/2 -translate-x-14'>Cargando...</p>
        </div>
    )
}
