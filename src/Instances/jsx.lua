local Package = script.Parent.Parent
local New = require(Package.Instances.New)
local Children = require(Package.Instances.Children)
local OnChange = require(Package.Instances.OnChange)
local OnEvent = require(Package.Instances.OnEvent)
local Out = require(Package.Instances.Out)

local function jsx(element, props, children)
	props[Children] = children

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
