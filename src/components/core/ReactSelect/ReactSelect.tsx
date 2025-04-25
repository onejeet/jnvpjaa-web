import React, { useState, useEffect, useRef } from 'react';
import Select, { MultiValue, SingleValue, components } from 'react-select';
import { CircularProgress, Box, useTheme, Avatar, AvatarGroup, FormHelperText, OutlinedInput } from '@mui/material';
import ProfilePicture from '@/components/common/ProfilePicture';
import TextField from '../TextField';
import { MagnifyingGlass } from '@phosphor-icons/react';

interface Option {
  value: string;
  label: string;
  avatarUrl?: string; // Optional for avatar-based options
}

interface ReactSelectProps {
  options: Option[];
  isMulti?: boolean;
  label?: string;
  isLoading?: boolean;
  onFetchMore?: () => void;
  onChange?: (value: SingleValue<Option> | MultiValue<Option>) => void;
  placeholder?: string;
  value?: SingleValue<Option> | MultiValue<Option>;
  isSearchable?: boolean;
  size?: 'small' | 'medium';
  showAvatars?: boolean; // Determines if avatars should be used
  isClearable?: boolean;
}

// Custom Multi Value Component
const MultiValueLabel = ({ data, showAvatars, ...props }: any) => (
  <components.MultiValueLabel {...props}>
    <Box display="flex" alignItems="center" gap={1}>
      {showAvatars && data.avatarUrl && <Avatar src={data.avatarUrl} alt={data.label} sx={{ width: 20, height: 20 }} />}
      {data.label}
    </Box>
  </components.MultiValueLabel>
);

// Custom Multi Value Container with AvatarGroup
const MultiValueContainer = (props: any) => {
  const { selectProps, children } = props;
  const selectedOptions = Array.isArray(selectProps.value) ? selectProps.value : [];

  if (selectProps.isMulti && selectProps.showAvatars) {
    return (
      <AvatarGroup max={4}>
        {selectedOptions.map((option: Option) => (
          <Avatar key={option.value} src={option.avatarUrl} alt={option.label} />
        ))}
      </AvatarGroup>
    );
  }

  return <components.MultiValueContainer {...props} />;
};

// Custom Menu with Search Bar
const CustomMenuList = (props: any) => {
  const { children, search, setSearch, selectProps, isSearchable, ...restProps } = props;

  const filteredOptions = selectProps.options.filter((option: Option) =>
    option.label.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  return (
    <Box>
      {/* {isSearchable && (
        <Box p={1}>
          <TextField
            fullWidth
            size="small"
            variant="outlined"
            startAdornment={<IconSearch size={24} />}
            placeholder="Search..."
            value={search} // bind the search state to the input field
            onChange={handleSearchChange} // update the search state on input change
          />
        </Box>
      )} */}
      {/* <components.MenuList {...restProps}>
        {filteredOptions.length > 0 ? (
          filteredOptions.map((option: Option) => <components.Option key={option.value} {...props} data={option} />)
        ) : (
          <Box textAlign="center" p={2}>
            No results found
          </Box>
        )}
      </components.MenuList> */}
      <components.MenuList {...restProps}>{children}</components.MenuList>
    </Box>
  );
};

const CustomOption = (props: any) => {
  const { data, showAvatars, size } = props;
  return (
    <components.Option {...props}>
      <Box display="flex" alignItems="center" gap={1}>
        {showAvatars && data.avatarUrl ? (
          <ProfilePicture title={data?.label} src={data.avatarUrl} alt={data.label} size={size === 'small' ? 24 : 28} />
        ) : (
          data.label
        )}
      </Box>
    </components.Option>
  );
};

const ReactSelect: React.FC<ReactSelectProps> = ({
  options,
  isMulti = false,
  isLoading = false,
  onFetchMore,
  onChange,
  placeholder = 'Select...',
  value,
  isSearchable,
  size,
  isClearable,
  label,
  showAvatars = false,
}) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const menuListRef = useRef<HTMLDivElement | null>(null);
  const theme = useTheme();

  const handleScroll = (event: any) => {
    const target = event.currentTarget;
    if (target.scrollHeight - target.scrollTop === target.clientHeight) {
      onFetchMore?.();
    }
  };

  // Custom Single Value Component
  const SingleValueComp = React.useCallback(
    ({ data, showAvatars, ...props }: any) => (
      <components.SingleValue {...props}>
        <Box display="flex" alignItems="center" gap={1}>
          {showAvatars && data.avatarUrl ? (
            <ProfilePicture
              title={data.label}
              src={data.avatarUrl}
              alt={data.label}
              size={size === 'small' ? 24 : 32}
            />
          ) : (
            data.label
          )}
        </Box>
      </components.SingleValue>
    ),
    [size]
  );
  const filterOption = React.useCallback(
    (option: Option) => {
      return option.label.toLowerCase().includes(search.toLowerCase());
    },
    [search]
  );

  return (
    <>
      <Select
        options={options}
        isMulti={isMulti}
        value={value}
        // filterOption={filterOption}
        onChange={isLoading ? undefined : onChange}
        placeholder={placeholder}
        isLoading={isLoading}
        isClearable={isClearable}
        isSearchable={isSearchable}
        menuIsOpen={menuIsOpen}
        onMenuOpen={() => setMenuIsOpen(true)}
        onMenuClose={() => setMenuIsOpen(false)}
        // getOptionLabel={(e) => (
        //   <Box display="flex" alignItems="center" gap={1}>
        //     {showAvatars && e.avatarUrl ? (
        //       <ProfilePicture title={e?.label} src={e.avatarUrl} alt={e.label} size={24} />
        //     ) : (
        //       e?.label
        //     )}
        //   </Box>
        // )}
        components={{
          Option: (props) => <CustomOption {...props} showAvatars={showAvatars} size={size} />,
          SingleValue: (props) => <SingleValueComp {...props} showAvatars={showAvatars} />,
          MultiValueLabel: (props) => <MultiValueLabel {...props} showAvatars={showAvatars} />,
          MultiValueContainer: (props) =>
            isMulti && showAvatars ? (
              <MultiValueContainer {...props} showAvatars={showAvatars} />
            ) : (
              <components.MultiValueContainer {...props} />
            ),
          MenuList: (props) => (
            <CustomMenuList
              {...props}
              search={search}
              setSearch={setSearch}
              isSearchable={isSearchable}
              options={options}
            />
          ),
          LoadingIndicator: () => (
            <Box display="flex" justifyContent="center" p={1}>
              <CircularProgress size={20} />
            </Box>
          ),
        }}
        styles={{
          container: (provided) => ({
            ...provided,
            width: '100%',
          }),
          valueContainer: (provided) => ({
            ...provided,
            width: '100%',
            minHeight: size === 'small' ? 36 : 42.88,
          }),
          control: (provided) => ({
            ...provided,
            borderRadius: 4,
            borderColor: '#ccc',
            boxShadow: 'none',
            '&:hover': { borderColor: '#888' },
          }),
          option: (provided: any, state: { isSelected: boolean; isFocused: boolean }) => ({
            ...provided,
            backgroundColor: state.isSelected
              ? theme.palette.primary.light
              : state.isFocused
                ? theme.palette.action.hover
                : 'transparent',
            color: state.isSelected ? theme.palette.primary.contrastText : theme.palette.text.primary,
          }),
          menu: (provided) => ({
            ...provided,
            borderRadius: 4,
            backgroundColor: theme.palette.background.paper,
            zIndex: 999999,
          }),
        }}
      />
      {/* <FormHelperText>Type to search...</FormHelperText> */}
    </>
  );
};

export default ReactSelect;
