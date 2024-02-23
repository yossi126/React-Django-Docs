import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import AccountCircle from "@mui/icons-material/AccountCircle";
import SearchIcon from "@mui/icons-material/Search";
const SearchBar = () => {
  return (
    <div>
      <FormControl fullWidth variant="standard">
        <InputLabel htmlFor="input-with-icon-adornment">
          Search for tutorial
        </InputLabel>
        <Input
          id="input-with-icon-adornment"
          placeholder="Search"
          startAdornment={
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          }
        />
      </FormControl>
    </div>
  );
};

export default SearchBar;
