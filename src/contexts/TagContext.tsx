import {createContext, useState} from 'react';

import {ReactPropsChildrenType} from '../types/global';

interface TagType {
   name: string;
   isActive: boolean;
   defaultActive?: boolean;
}

interface TagsType {
   global: TagType[];
   [group: string]: TagType[];
}

interface TagContextType {
   tags: TagsType;
   setTags: React.Dispatch<React.SetStateAction<TagsType>>;
   register: (name: string, groupId: string, defaultActive?: boolean) => void;
   handleClick: (name: string, groupId: string) => void;
   getActiveTags: () => TagType[];
}
export const TagContext = createContext({} as TagContextType);

const toggleTag = (tag: TagType) => ({...tag, isActive: !tag.isActive});

export const TagProvider = ({children}: ReactPropsChildrenType) => {
   const [tags, setTags] = useState<TagsType>({global: []});

   const register: TagContextType['register'] = (
      name,
      groupId,
      defaultActive,
   ) => {
      setTags(prev => {
         if (prev[groupId]?.find(tag => tag.name === name)) return prev;

         return {
            ...prev,
            [groupId]: [
               ...(prev[groupId] || []),
               {
                  name,
                  isActive: Boolean(defaultActive),
                  defaultActive,
               },
            ],
         };
      });
   };

   const handleClick: TagContextType['handleClick'] = (name, groupId) => {
      const alwaysOneActive = tags[groupId].find(tag => tag.defaultActive);
      const activeTagName = tags[groupId].find(tag => tag.isActive)?.name;

      setTags(prev => ({
         ...prev,
         [groupId]: prev[groupId].map(tag => {
            if (groupId === 'global') {
               // Global group
               if (tag.name === name) return toggleTag(tag); // Toggle global tag
            } else {
               // Local group
               if (alwaysOneActive && activeTagName === name)
                  return tag; // Keep one active
               else if (tag.name === activeTagName)
                  return toggleTag(tag); // Disable active
               else if (tag.name === name) return toggleTag(tag); // Activate clicked
            }

            return tag;
         }),
      }));
   };

   const getActiveTags = () => {
      const groups = Object.keys(tags);

      return groups.reduce((acc, group) => {
         const activeTags = tags[group].filter(tag => tag.isActive);
         return [...acc, ...activeTags];
      }, [] as TagType[]);
   };

   return (
      <TagContext.Provider
         value={{
            tags,
            setTags,
            register,
            handleClick,
            getActiveTags,
         }}
      >
         {children}
      </TagContext.Provider>
   );
};
