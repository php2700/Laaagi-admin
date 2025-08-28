import React, { useState } from "react";
import PropTypes from "prop-types"; // ✅ Required for prop validation
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

function ExpandableText ({ text, limit = 40 }) {
  const [expanded, setExpanded] = useState(false);
  const isLong = text && text.length > limit;

  if (!isLong) {
    return <MDTypography variant="caption" color="text">{text}</MDTypography>;
  }

  return (
    <div>
      <MDTypography variant="caption" color="text">
        {expanded ? text : `${text.slice(0, limit)}... `}
        <MDButton
          variant="text"
          color="info"
          size="small"
          onClick={() => setExpanded(!expanded)}
          sx={{ textTransform: "none", padding: 0, minWidth: 0 }}
        >
          {expanded ? "See less" : "See more"}
        </MDButton>
      </MDTypography>
    </div>
  );
}

// ✅ Fix: Add PropTypes to validate props
ExpandableText.propTypes = {
  text: PropTypes.string.isRequired,
  limit: PropTypes.number,
};

export default ExpandableText;