<template>
    <div>
        <div>
            <el-input
                style="width: 400px"
                placeholder="请输入职位..."
                v-model="pos.name"
                @keydown.enter.native="addPosition()">
                <el-button slot="append" icon="el-icon-plus" @click="addPosition()">添加</el-button>
            </el-input>
            <el-button type="danger" style="margin-left: 365px" :disabled="this.multipleSelection.length==0" @click="deletePositions()">批量删除</el-button>
        </div>
        <div>
            <el-table class="posTable" :data="positions" stripe height="430" @selection-change="handleSelectionChange" style="width: 70%">
                <el-table-column align="center" type="selection" width="55"></el-table-column>
                <el-table-column align="center" prop="id" label="编号" width="70"></el-table-column>
                <el-table-column align="center" prop="name" label="职位名称" width="180"></el-table-column>
                <el-table-column align="center" prop="createDate" label="创建日期" width="200"></el-table-column>
                <el-table-column align="center" prop="enabled" label="是否启用" width="100">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.enabled" type="success">已启用</el-tag>
                        <el-tag v-else type="danger">未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="操作" width="250">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showDialog(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="编辑职位" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input v-model="updatePos.name" style="width: 70%; margin-left: 10px"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="updatePosition()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>
           
<script>
    export default {
        name: 'PosMana',
        data() {
            return {
                pos: {
                    name: ''
                },
                positions: [],
                dialogVisible: false,
                updatePos: {
                    name: '',
                },
                multipleSelection: [],
            }
        },
        mounted() {
            this.initPositions();
        },
        methods: {
            initPositions() {
                this.getRequest('/system/basic/position/').then(resp => {
                    if (resp) {
                        this.positions = resp;
                    }
                })
            },
            addPosition() {
                if (this.pos.name) {
                    this.postRequest('/system/basic/position/', this.pos).then(resp => {
                        if (resp) {
                            this.initPositions();
                            this.pos.name = '';
                        }
                    })
                } else {
                    this.$message.error('职位信息不能为空！');
                }
            },
            updatePosition() {
                this.putRequest('/system/basic/position/', this.updatePos).then(resp => {
                    if (resp) {
                        this.initPositions();
                        this.dialogVisible = false;
                    }
                })
            },
            handleDelete(data) {
                this.$confirm('此操作将永久删除 [ ' + data.name + ' ] 职位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest('/system/basic/position/' + data.id).then(resp => {
                            if (resp) {
                                this.initPositions();
                            }
                        })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            deletePositions() {
                this.$confirm('此操作将永久删除 [ ' + this.multipleSelection.length + ' ] 条职位数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = "?";
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest('/system/basic/position/' + ids).then(resp => {
                        if (resp) {
                            this.initPositions();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            },
            showDialog(data) {
                Object.assign(this.updatePos, data);
                this.updatePos.createDate = '';
                this.dialogVisible = true;
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        },
    }
</script>
         
<style>
    .posTable {
        text-align: center;
    }
</style>