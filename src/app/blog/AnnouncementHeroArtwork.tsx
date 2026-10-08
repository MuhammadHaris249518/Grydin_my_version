import Image from "next/image";

export function AnnouncementHeroArtwork() {
  return (
    <div className="relative mx-auto flex w-full max-w-[520px] justify-center lg:mr-0 lg:justify-end">
      <div className="relative w-full">
        <div
          className="pointer-events-none absolute inset-0 scale-90 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(13, 139, 153, 0.16) 0%, rgba(45, 212, 191, 0.08) 45%, transparent 70%)",
          }}
        />
        <Image
          src="/assets/images/blog/category-robot.png"
          alt="GrydIn AI assistant working at a laptop"
          width={587}
          height={385}
          priority
          sizes="(max-width: 1024px) 100vw, 40vw"
          className="relative z-10 h-auto w-full select-none object-contain drop-shadow-sm mix-blend-multiply transition-transform duration-500 hover:scale-[1.02]"
        />
      </div>
    </div>
  );
}
