module.exports = {
	description: '组件模版',
	prompts: [
		{
			type: 'input',
			name: 'DIR_NAME',
			message: '请输入所在文件夹名称',
			default: 'components',
		},
		{
			type: 'input',
			name: 'FILE_NAME',
			message: '请输入组件文件名',
			default: 'demo',
		},
	],
	actions() {
		let path = '{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}/{{camelCase FILE_NAME}}'
		return [
			{
				type: 'add',
				path: `../src/${path}.tsx`,
				templateFile: './component/component.hbs',
			},
			{
				type: 'add',
				path: `../src/${path}.styl`,
				templateFile: './component/style.styl',
			},
		]
	},
}
