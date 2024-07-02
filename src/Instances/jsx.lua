local Package = script.Parent.Parent
local New = require(Package.Instances.New)
local Children = require(Package.Instances.Children)
local Cleanup = require(Package.Instances.Cleanup)
local OnChange = require(Package.Instances.OnChange)
local OnEvent = require(Package.Instances.OnEvent)
local Out = require(Package.Instances.Out)
local Ref = require(Package.Instances.Ref)

local function jsx(element, props, ...)
	local children = table.pack(...)
	if children.n == 0 then
		-- TS type `[]` is not usable in JSX, so optional children are always with undefined
		-- So leave the property empty as well
	elseif children.n == 1 then
		props[Children] = children[1]
	else
		props[Children] = children
	end

	if typeof(element) ~= "string" then
		return element(props)
	else
		for k, v in props do
			if typeof(k) == "string" then
				-- local parts = string.split(k, ":")
				-- local namespace, key = parts[1], table.concat(parts, ":", 2)
				local i = string.find(k, ":")
				local namespace = string.sub(k, 1, i - 1)
				local key = string.sub(k, i + 1)
				local newKey
				if namespace == "OnChange" then
					newKey = OnChange(key)
				elseif namespace == "OnEvent" then
					newKey = OnEvent(key)
				elseif namespace == "Out" then
					newKey = Out(key)
				elseif key == "Children" then
					newKey = Children
				elseif key == "Cleanup" then
					newKey = Cleanup
				elseif key == "Ref" then
					newKey = Ref
				end
				if newKey then
					props[newKey] = v
					props[k] = nil
				end
			end
		end
		local elementName = string.upper(string.sub(element, 1, 1)) .. string.sub(element, 2)
		return New(elementName)(props)
	end
end

return jsx
