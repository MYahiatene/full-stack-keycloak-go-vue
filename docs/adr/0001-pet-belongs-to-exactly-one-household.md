# A Pet belongs to exactly one Household

A Pet is owned by a single Household (`pets.household_id`), and authorization is one check: is the User a Member of the Pet's Household? We rejected sharing a Pet across Households (for example with a pet-sitter) because it needs a many-to-many schema and per-Pet permissions. A pet-sitter is instead invited as a Member of that Household. Reversing this later means a schema change and a rewrite of authorization.
