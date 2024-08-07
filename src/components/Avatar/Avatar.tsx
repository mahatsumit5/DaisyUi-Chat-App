export const Avatar = ({
  url,
  classname,
  initial,
}: {
  url: string | null;
  classname?: string;
  initial: string;
}) => {
  return url ? (
    <div className="avatar">
      <div className={`${classname}  rounded-full `}>
        <img src={url} alt="profile" loading="lazy" />
      </div>
    </div>
  ) : (
    <div className="avatar placeholder">
      <div
        className={`bg-base-300 text-base-content ${classname} rounded-full`}
      >
        <span>{initial}</span>
      </div>
    </div>
  );
};
