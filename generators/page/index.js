module.exports = {
	description: '页面模版',
	prompts: [
		{
			type: 'input',
			name: 'DIR_NAME',
			message: '请输入所在文件夹名称',
			default: 'pages',
		},
		{
			type: 'input',
			name: 'FILE_NAME',
			message: '请输入页面文件名',
			default: 'demo',
		},
		{
			type: 'input',
			name: 'FILE_DESC',
			message: '请输入页面标题',
			default: 'title',
		},
	],
	actions() {
		let path = '{{camelCase DIR_NAME}}/{{camelCase FILE_NAME}}/{{camelCase FILE_NAME}}'
		return [
			{
				type: 'add',
				path: `../src/${path}.tsx`,
				templateFile: './page/page.hbs',
			},
			{
				type: 'add',
				path: `../src/${path}.styl`,
				templateFile: './page/style.styl',
			},
			{
				type: 'add',
				path: `../src/${path}.config.ts`,
				templateFile: './page/config.hbs',
			},
			{
				type: 'modify',
				path: '../src/app.config.ts',
				pattern: '//* add new pages here',
				template: `'${path}',\n//* add new pages here`,
			},
		]
	},
}
