function PageHeader({
  title,
  subtitle = "",
  buttonText,
  onButtonClick,
  buttonIcon = null,
}) {
  return (
    <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

      <div>

        <h1 className="text-3xl font-bold tracking-tight text-gray-800">
          {title}
        </h1>

        {subtitle && (
          <p className="mt-2 text-gray-500">
            {subtitle}
          </p>
        )}

      </div>

      {buttonText && (
        <button
          onClick={onButtonClick}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-medium text-white shadow-md transition-all duration-200 hover:bg-blue-700 hover:shadow-lg active:scale-95"
        >
          {buttonIcon}

          <span>{buttonText}</span>
        </button>
      )}

    </div>
  );
}

export default PageHeader;