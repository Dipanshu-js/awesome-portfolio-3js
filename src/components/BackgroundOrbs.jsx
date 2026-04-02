const BackgroundOrbs = () => {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 0,
        overflow: "hidden",
      }}
      aria-hidden="true"
    >
      {/* Purple top-left orb */}
      <div className="bg-orb bg-orb-1" />
      {/* Cyan bottom-right orb */}
      <div className="bg-orb bg-orb-2" />
      {/* Pink mid-center orb */}
      <div className="bg-orb bg-orb-3" />
      {/* Small teal bottom-left */}
      <div className="bg-orb bg-orb-4" />
    </div>
  );
};

export default BackgroundOrbs;
