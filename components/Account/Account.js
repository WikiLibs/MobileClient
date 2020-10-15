import * as React from 'react'
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native'
import { Button, Switch, TextInput } from 'react-native-paper'
import ApiService from '../../ApiService'
import showToast from './../../tools/Toast'

export default class Account extends React.Component {

    state = {
        isConnected: false,
        isRegistering: false,
        email: '',
        password: '',
        registerLastname: '',
        registerFirstname: '',
        registerEmail: '',
        registerPublic: true,
        registerProfileMessage: '',
        registerUsername: '',
        registerPassword: '',
        message: '',
        error: false,
        user: null,
        isUpdating: false,
        updateUsername: '',
        updateProfileMessage: '',
        updatePassword: '',
        updatePasswordOld: '',
        forgetPasswordOn: false,
        emailForgot: ''
    }

    componentDidMount = async () => {
        let token = global.api.token
        if (token) {
            this.setState({isConnected: true})
            global.api.getMe()
                .then((Response) =>{
                    this.setState({user: Response.data})
                })
                .catch(error => {
                    console.log(error)
                })
        }
    }

    onPressModify = () => {
        this.setState({
            isUpdating: true,
            updateUsername: this.state.user.pseudo,
            updateProfileMessage: this.state.user.profileMsg,
            updatePassword: '',
            updatePasswordOld: ''
        })
    }

    onPressUpdate = () => {
        if (this.state.updatePasswordOld) {
            let state = {
                profileMsg: this.state.updateProfileMessage,
                pseudo: this.state.updateUsername,
                newPassword: this.state.updatePassword,
                password: this.state.updatePasswordOld
            }
            global.api.patchMe(state)
                .then((Response) => {
                    this.setState({
                        isUpdating: false,
                        updateUsername: '',
                        updateProfileMessage: '',
                        updatePassword: '',
                        updatePasswordOld: ''
                    })
                    global.api.getMe().then((Response) =>{
                        this.setState({user: Response.data})
                    })
                })
                .catch(error => {
                    this.setState({ apiError: global.api.translateErrorMessage(error) });
                });
        }
    }

    onUpdateUsernameChange = (event) => {
        this.setState({updateUsername: event});
    }

    onUpdateProfileMessageChange = (event) => {
        this.setState({updateProfileMessage: event});
    }

    onUpdatePasswordChange = (event) => {
        this.setState({updatePassword: event});
    }

    onUpdatePasswordOldChange = (event) => {
        this.setState({updatePasswordOld: event});
    }

    renderProfile = () => {
        return (
            <ScrollView>
                {this.state.user
                    ? <View>
                        {!this.state.isUpdating
                            ? <View>
                                <Text style={styles.title}>{this.state.user.pseudo}'s Account</Text>
                                <View style={styles.separator}/>
                                <Text style={styles.accountField}>Username</Text>
                                <Text style={styles.accountValue}>{this.state.user.pseudo}</Text>
                                <View style={styles.separatorProfile}/>
                                <Text style={styles.accountField}>Firstname</Text>
                                <Text style={styles.accountValue}>{this.state.user.firstName}</Text>
                                <View style={styles.separatorProfile}/>
                                <Text style={styles.accountField}>Lastname</Text>
                                <Text style={styles.accountValue}>{this.state.user.lastName}</Text>
                                <View style={styles.separator}/>
                                <Text style={styles.accountField}>Public account</Text>
                                <Text style={styles.accountValue}>{this.state.user.private ? 'No' : 'Yes'}</Text>
                                <View style={styles.separatorProfile}/>
                                <Text style={styles.accountField}>Email</Text>
                                <Text style={styles.accountValue}>{this.state.user.email}</Text>
                                <View style={styles.separatorProfile}/>
                                <Text style={styles.accountField}>Profile message</Text>
                                <Text style={styles.accountValue}>{this.state.user.profileMsg}</Text>
                                <View style={styles.separator}/>
                                <Button
                                    mode="contained"
                                    onPress={this.onPressModify}
                                    contentStyle={styles.buttonLogin}
                                >
                                    MODIFY PROFILE
                                </Button>
                            </View>
                            : <View>
                                <Text style={styles.title}>Update account</Text>
                                <View style={styles.separator}/>
                                <TextInput
                                    label="Username"
                                    placeholder="Input username here (optional)"
                                    mode="outlined"
                                    autoCompleteType='username'
                                    selectionColor="#7B68EE"
                                    onChangeText={this.onUpdateUsernameChange}
                                    value={this.state.updateUsername}
                                />
                                <View style={styles.separator}/>
                                <TextInput
                                    label="Profile message"
                                    placeholder="Input profile message here (optional)"
                                    mode="outlined"
                                    selectionColor="#7B68EE"
                                    onChangeText={this.onUpdateProfileMessageChange}
                                    value={this.state.updateProfileMessage}
                                />
                                <View style={styles.separator}/>
                                <TextInput
                                    label="New password"
                                    placeholder="Input new password here (optional)"
                                    mode="outlined"
                                    autoCompleteType='password'
                                    secureTextEntry={true}
                                    selectionColor="#7B68EE"
                                    onChangeText={this.onUpdatePasswordChange}
                                    value={this.state.updatePassword}
                                />
                                <View style={styles.separator}/>
                                <TextInput
                                    label="Current password *"
                                    placeholder="Input current password here"
                                    mode="outlined"
                                    autoCompleteType='password'
                                    secureTextEntry={true}
                                    selectionColor="#7B68EE"
                                    onChangeText={this.onUpdatePasswordOldChange}
                                    value={this.state.updatePasswordOld}
                                />
                                <View style={styles.separator}/>
                                <Button
                                    mode="contained"
                                    onPress={this.onPressUpdate}
                                    contentStyle={styles.buttonLogin}
                                >
                                    UPDATE PROFILE
                                </Button>
                            </View>
                        }
                        
                    </View>
                    : <Text style={styles.title}>Loading account...</Text>
                }
            </ScrollView>
        )
    }

    onEmailChange = (event) => {
        this.setState({email: event});
    }

    onPasswordChange = (event) => {
        this.setState({password: event});
    }

    onEmailForgotChange = (event) => {
        this.setState({emailForgot: event});
    }

    onPressLogin = () => {
        global.api.connectUser(this.state)
            .then((Response) => {
                if (Platform.OS === 'android')
                    showToast("Successfuly signed in")
                this.setState({isConnected: true})
                global.api.getMe().then((Response) =>{
                    this.setState({user: Response.data})
                })
            })
    }

    onPressRegister = () => {
        this.setState({
            email: '',
            password: '',
            isRegistering: true
        })
    }

    onPressForgot = () => {
        this.setState({
            forgetPasswordOn: true
        })
    }

    onPressForgotSend = () => {
        this.setState({
            forgetPasswordOn: false,
            emailForgot: ''
        })
    }

    renderConnect = () => {
        return (
            <View>
                <Text style={styles.title}>Sign in</Text>
                <View style={styles.separator}/>
                <TextInput
                    label="Email"
                    placeholder="Input email here"
                    mode="outlined"
                    autoCompleteType='email'
                    selectionColor="#7B68EE"
                    keyboardType='email-address'
                    onChangeText={this.onEmailChange}
                    value={this.state.email}
                />
                <View style={styles.separatorSmall}/>
                <TextInput
                    label="Password"
                    placeholder="Input password here"
                    mode="outlined"
                    secureTextEntry={true}
                    autoCompleteType='password'
                    selectionColor="#7B68EE"
                    onChangeText={this.onPasswordChange}
                    value={this.state.password}
                />
                <View style={styles.separator}/>
                <Button
                    mode="contained"
                    onPress={this.onPressLogin}
                    contentStyle={styles.buttonLogin}
                >
                    LOGIN
                </Button>
                <View style={styles.separatorBig}/>
                <Text style={styles.title}>
                    Not a member yet ?
                </Text>
                <View style={styles.separator}/>
                <Button
                    mode="contained"
                    onPress={this.onPressRegister}
                    contentStyle={styles.buttonLogin}
                >
                    REGISTER
                </Button>
                <View style={styles.separatorMedium}/>
                <Text style={styles.title}>
                    Forgot your password ?
                </Text>
                <View style={styles.separator}/>
                {!this.state.forgetPasswordOn
                    ? <Button
                        mode="contained"
                        onPress={this.onPressForgot}
                        contentStyle={styles.buttonLogin}
                    >
                        SEND MAIL
                    </Button>
                    : <View>
                        <TextInput
                            label="Email"
                            placeholder="Input email here"
                            mode="outlined"
                            autoCompleteType='email'
                            selectionColor="#7B68EE"
                            keyboardType='email-address'
                            onChangeText={this.onEmailForgotChange}
                            value={this.state.emailForgot}
                        />
                        <View style={styles.separator}/>
                        <Button
                            mode="contained"
                            onPress={this.onPressForgotSend}
                            contentStyle={styles.buttonLogin}
                        >
                            SEND
                        </Button>
                    </View>
                }
                
            </View>
        )
    }

    onFirstnameChange = (event) => {
        this.setState({registerFirstname: event});
    }

    onLastnameChange = (event) => {
        this.setState({registerLastname: event});
    }

    onEmailRegisterChange = (event) => {
        this.setState({registerEmail: event});
    }

    onPressPublic = () => {
        this.setState({registerPublic: !this.state.registerPublic})
    }

    onProfileMessageChange = (event) => {
        this.setState({registerProfileMessage: event});
    }

    onUsernameChange = (event) => {
        this.setState({registerUsername: event});
    }

    onPasswordRegisterChange = (event) => {
        this.setState({registerPassword: event});
    }

    onPressRegisterRequest = () => {
        if (
            this.state.registerFirstname === '' ||
            this.state.registerLastname === '' ||
            this.state.registerEmail === '' ||
            this.state.registerUsername === '' ||
            this.state.registerPassword
        )
            this.setState({message: 'Please check that you filled all mandatory fields'})
        
        let state = {
            firstName: this.state.registerFirstname,
            lastName: this.state.registerLastname,
            email: this.state.registerEmail,
            private: this.state.registerPublic,
            profilMsg: this.state.registerProfileMessage,
            pseudo: this.state.registerUsername,
            password: this.state.registerPassword,
        }
        global.api.createUser(state)
            .then((Response) => {
                this.setState({ message: "Successfully created account, please check your email.", error: false });
            })
            .catch((error) => {
                this.setState({ message: global.api.translateErrorMessage(error), error: true });
            })
    }

    onPressBack = () => {
        this.setState({
            registerFirstname: '',
            registerLastname: '',
            registerEmail: '',
            registerPublic: true,
            registerProfileMessage: '',
            registerUsername: '',
            registerPassword: '',
            message: '',
            error: false,
            isRegistering: false
        })
    }

    renderRegister = () => {
        return (
            <View>
                <Text style={styles.title}>Register</Text>
                <View style={styles.separator}/>
                <TextInput
                    label="Firstname *"
                    placeholder="Input firstname here"
                    mode="outlined"
                    autoCompleteType='name'
                    selectionColor="#7B68EE"
                    onChangeText={this.onFirstnameChange}
                    value={this.state.registerFirstname}
                />
                <View style={styles.separatorSmall}/>
                <TextInput
                    label="Lastname *"
                    placeholder="Input lastname here"
                    mode="outlined"
                    autoCompleteType='name'
                    selectionColor="#7B68EE"
                    onChangeText={this.onLastnameChange}
                    value={this.state.registerLastname}
                />
                <View style={styles.separatorSmall}/>
                <TextInput
                    label="Email *"
                    placeholder="Input email here"
                    mode="outlined"
                    autoCompleteType='email'
                    selectionColor="#7B68EE"
                    keyboardType='email-address'
                    onChangeText={this.onEmailRegisterChange}
                    value={this.state.registerEmail}
                />
                <View style={styles.separatorSmall}/>
                <View style={styles.publicSwitchContainer}>
                    <Switch 
                        color="#7B68EE" 
                        value={this.state.registerPublic} 
                        onValueChange={this.onPressPublic} 
                    />
                    <Text style={{marginLeft: 16}}>Public account</Text>
                </View>
                <View style={styles.separatorSmall}/>
                <TextInput
                    label="Profile message"
                    placeholder="Input profile message here"
                    mode="outlined"
                    selectionColor="#7B68EE"
                    onChangeText={this.onProfileMessageChange}
                    value={this.state.registerProfileMessage}
                />
                <View style={styles.separatorSmall}/>
                <TextInput
                    label="Username *"
                    placeholder="Input username here"
                    mode="outlined"
                    autoCompleteType='username'
                    selectionColor="#7B68EE"
                    onChangeText={this.onUsernameChange}
                    value={this.state.registerUsername}
                />
                <View style={styles.separatorSmall}/>
                <TextInput
                    label="Password *"
                    placeholder="Input password here"
                    mode="outlined"
                    autoCompleteType='password'
                    secureTextEntry={true}
                    selectionColor="#7B68EE"
                    onChangeText={this.onPasswordRegisterChange}
                    value={this.state.registerPassword}
                />
                
                <View style={styles.separator}/>
                <Button
                    mode="contained"
                    onPress={this.onPressRegisterRequest}
                    contentStyle={styles.buttonLogin}
                >
                    REGISTER
                </Button>
                <View style={styles.separator}/>
                <Button
                    mode="contained"
                    onPress={this.onPressBack}
                    contentStyle={styles.buttonLogin}
                >
                    BACK
                </Button>
                <Text style={!this.state.error ? styles.successMessage : styles.errorMessage}>{this.state.message}</Text>
                <View style={styles.separatorBig}/>
            </View>
        )
    }

    render = () => {
        return (
            <ScrollView style={styles.container}>
                {this.state.isConnected
                    ? this.renderProfile()
                    : !this.state.isRegistering
                        ? this.renderConnect()
                        : this.renderRegister()
                }
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 16
    },
    title: {
        color: "#4C3DA8",
        fontWeight: 'bold',
        fontSize: 24,
        marginBottom: 10
    },
    separator: {
        height: 16,
        opacity: 0
    },
    separatorSmall: {
        height: 8,
        opacity: 0
    },
    separatorMedium: {
        height: 32,
        opacity: 0
    },
    separatorBig: {
        height: 100,
        opacity: 0
    },
    buttonLogin: {
        backgroundColor: '#7B68EE',
        height: 56
    },
    publicSwitchContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    errorMessage: {
        color: '#FF3300',
        fontStyle: 'italic'
    },
    successMessage: {
        color: '#00CC66',
        fontStyle: 'italic'
    },
    note: {
        color: "#3E3E3E",
        fontStyle: 'italic',
        marginTop: 8
    },
    accountField: {
        fontSize: 16,
        color: '#4C3DA8'
    },
    accountValue: {
        color: "#3E3E3E"
    },
    separatorProfile: {
        height: 2,
        marginTop: 7,
        marginBottom: 7,
        backgroundColor: '#EBEBEB'
    }
})