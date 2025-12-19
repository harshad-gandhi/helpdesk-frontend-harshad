import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import "./Login.scss";

export default function Login() {
  return (
    <Box className="auth-container auth-theme">
      <Box className="auth-wrapper d-flex flex-column flex-lg-row">
        <Box className="auth-image-section d-flex justify-content-center align-items-center position-relative">
          <Box className="image-content text-center">
            <img
              className="main-illustration"
              src="/src/assets/images/auth-left-side-img.jpg"
              alt="Login Illustration"
            />
          </Box>
        </Box>

        <Box className="auth-form-section d-flex justify-content-center align-items-center">
          <Box className="form-container">
            {/* Brand Header */}
            <Box className="brand-header mb-3 mb-lg-4">
              <Box className="brand-info d-flex align-items-center">
                <Box className="brand-logo">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="65"
                    height="70"
                    viewBox="0 0 500 500"
                  >
                    <g
                      transform="translate(0,500) scale(0.1,-0.1)"
                      fill="currentColor"
                    >
                      <path d="M2645 3663c-11-2-69-18-130-34..." />
                    </g>
                  </svg>
                </Box>
                <Typography variant="h5" className="ms-2">
                  HelpDesk
                </Typography>
              </Box>

              <Typography
                variant="body2"
                className="brand-description d-none d-sm-block"
              >
                Welcome to HelpDesk Management System
              </Typography>
            </Box>

            <Box className="form-header mb-3 mb-lg-4">
              <Typography variant="h4">Login</Typography>
            </Box>

            <Box component="form" className="auth-form">
              <TextField
                fullWidth
                label="Email*"
                placeholder="Enter your email"
                margin="normal"
                type="email"
                variant="filled"
              />

              <TextField
                fullWidth
                label="Password*"
                placeholder="Enter your password"
                margin="normal"
                type="password"
                variant="filled"
              />

              <Box
                className="auth-options-row"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                mt={1}
                mb={2}
              >
                <FormControlLabel control={<Checkbox />} label="Remember me" />

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer" }}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                size="large"
                className="auth-button"
              >
                Login
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
